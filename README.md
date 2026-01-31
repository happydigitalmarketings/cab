Execution order:

server.js (already running)
   ↓
app.js
   ↓
cors()              ← middleware
   ↓
express.json()      ← middleware
   ↓
/api/auth matched
   ↓
auth.routes.js
   ↓
/send-otp matched
   ↓
sendOtp controller



FLOW WITH PROTECTED API (Trip Create)

POST /api/trip/create
   ↓
cors()
   ↓
express.json()
   ↓
authMiddleware   🔐
   ↓
roleMiddleware   🔐
   ↓
createTrip controller

