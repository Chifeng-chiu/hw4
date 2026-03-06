from fastapi import FastAPI, Form, HTTPException, Response, Cookie
from fastapi.responses import HTMLResponse
import yfinance as yf
import sqlite3
import pandas as pd
from typing import Optional

app = FastAPI()

# 初始化資料庫：建立使用者表與股票表
def init_db():
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    # 使用者帳密表
    cursor.execute('''CREATE TABLE IF NOT EXISTS users 
                      (username TEXT PRIMARY KEY, password TEXT)''')
    # 股票表：多加了 owner 欄位來區分是誰的股票
    cursor.execute('''CREATE TABLE IF NOT EXISTS stocks 
                      (symbol TEXT, shares REAL, cost REAL, notes TEXT, owner TEXT,
                       PRIMARY KEY (symbol, owner))''')
    conn.commit()
    conn.close()

init_db()

# --- 身分驗證 API ---

@app.post("/api/register")
def register(username: str = Form(...), password: str = Form(...)):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users VALUES (?, ?)", (username, password))
        conn.commit()
        return {"message": "註冊成功，請登入"}
    except:
        raise HTTPException(status_code=400, detail="此帳號已被註冊")
    finally:
        conn.close()

@app.post("/api/login")
def login(response: Response, username: str = Form(...), password: str = Form(...)):
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    user = cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password)).fetchone()
    conn.close()
    if user:
        # 登入成功，將用戶名存入 Cookie (簡單版驗證)
        response.set_cookie(key="user_session", value=username)
        return {"message": "登入成功"}
    raise HTTPException(status_code=401, detail="帳號或密碼錯誤")

@app.get("/api/auth/verify")
def verify_auth(user_session: Optional[str] = Cookie(None)):
    if user_session:
        return {"logged_in": True, "username": user_session}
    return {"logged_in": False}

@app.post("/api/logout")
def logout_api(response: Response):
    response.delete_cookie("user_session")
    return {"message": "登出成功"}

# --- 股票數據 API ---

@app.get("/api/portfolio")
def get_portfolio(user_session: Optional[str] = Cookie(None)):
    if not user_session:
        return {"items": [], "summary": {"total_value": 0, "total_profit": 0, "profit_percent": "0%"}}
    
    conn = sqlite3.connect('portfolio.db')
    df_db = pd.read_sql_query("SELECT * FROM stocks WHERE owner=?", conn, params=(user_session,))
    conn.close()
    
    results = []
    total_value, total_cost = 0, 0

    for _, row in df_db.iterrows():
        stock = yf.Ticker(row['symbol'])
        data = stock.history(period="2d")
        if not data.empty:
            curr = data['Close'].iloc[-1]
            cost, shares = row['cost'], row['shares']
            profit = (curr - cost) * shares
            total_value += curr * shares
            total_cost += cost * shares
            results.append({
                "symbol": row['symbol'], "shares": shares, "cost": cost,
                "price": round(curr, 2), "profit": round(profit, 0),
                "percent": f"{round(((curr - cost) / cost) * 100, 2) if cost > 0 else 0}%",
                "notes": row['notes'] if row['notes'] else ""
            })
            
    profit_pct = round(((total_value - total_cost) / total_cost * 100), 2) if total_cost > 0 else 0
    return {
        "items": results,
        "summary": {
            "total_value": round(total_value, 0),
            "total_profit": round(total_value - total_cost, 0),
            "profit_percent": f"{profit_pct}%"
        }
    }

@app.post("/api/add")
def add_stock(symbol: str = Form(...), shares: float = Form(...), cost: float = Form(...), 
              notes: str = Form(""), user_session: Optional[str] = Cookie(None)):
    if not user_session: raise HTTPException(status_code=401)
    if len(symbol) == 4 and symbol.isdigit(): symbol += ".TW"
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("INSERT OR REPLACE INTO stocks VALUES (?, ?, ?, ?, ?)", 
                   (symbol, shares, cost, notes, user_session))
    conn.commit()
    conn.close()
    return {"message": "Success"}

@app.post("/api/delete")
def delete_stock(symbol: str = Form(...), user_session: Optional[str] = Cookie(None)):
    if not user_session: raise HTTPException(status_code=401)
    conn = sqlite3.connect('portfolio.db')
    cursor = conn.cursor()
    cursor.execute("DELETE FROM stocks WHERE symbol = ? AND owner = ?", (symbol, user_session))
    conn.commit()
    conn.close()
    return {"message": "Deleted"}

@app.get("/api/history/{symbol}")
def get_stock_history(symbol: str):
    stock = yf.Ticker(symbol)
    df = stock.history(period="3mo")
    history = [{"time": i.strftime('%Y-%m-%d'), "open": r['Open'], "high": r['High'], "low": r['Low'], "close": r['Close']} 
               for i, r in df.iterrows()]
    return history

@app.get("/", response_class=HTMLResponse)
def read_index():
    with open("main.html", "r", encoding="utf-8") as f: return f.read()