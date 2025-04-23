# 🚀 EzyAPI

**EzyAPI** is a super simple tool that lets developers paste JSON and instantly get a mock API endpoint — perfect for frontend testing, quick prototypes, or simulating backend responses without spinning up a server.

[🔗 Try it live](https://ezyapi.vercel.app)

---

## 📦 Features

- ⚡ Paste JSON → Get an instant API endpoint  
- 🧪 Supports arrays or single JSON objects  
- 🌐 Hosted and deployed using **Render** (backend) & **Vercel** (frontend)  
- 🎨 Clean UI with TailwindCSS  
- 🔒 No login, no signup, no rate limits  

---

## 🛠️ Tech Stack

- **Frontend**: HTML, TailwindCSS, Vanilla JS  
- **Backend**: Node.js, Express  
- **Storage**: Upstash Redis  
- **Deployment**: Render (API), Vercel (UI)  

---

## 💻 How It Works

1. Paste your JSON in the input field (arrays or objects).
2. Click **"Generate API"**.
3. Get a mock endpoint like:  
   `https://ezyapi.up.railway.app/api/<unique-id>`
4. Use that endpoint in your frontend to simulate API calls.

---

## 🔍 Example JSONs

Paste and test things like:

```json
{
  "orderId": "ORD789",
  "customer": {
    "id": 33,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "items": [
    { "productId": "p101", "quantity": 2 },
    { "productId": "p105", "quantity": 1 }
  ],
  "total": 89.97,
  "status": "shipped"
}
