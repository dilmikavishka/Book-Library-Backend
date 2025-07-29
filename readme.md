
# Project Setup Guide


## Getting the Project Up and Running

1. Install dependencies (use legacy peer deps for compatibility):

```bash
npm install --legacy-peer-deps
```

2. Start the development server (for local development only, **not** for production):

```bash
npm run dev
```

3. Build the project (for production):

```bash
npm run build
```

4. Start the production server:

```bash
npm run start
```

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=
REFRESH_TOKEN=
CLIENT_ORIGIN=http://localhost:5173
EMAIL_SERVICE=Gmail
EMAIL_USER=
EMAIL_PASS=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

```

- Replace `<your_database_name>` with your actual MySQL database name.
- Use a strong secret for `JWT_SECRET`.
- Set `EMAIL_USER` and `EMAIL_PASS` for email authentication.

---


Follow these instructions to set up and run the project successfully.

Images




## 📸 UI Preview

![DevHireX UI Preview](./demo%20images/6073393961013200195.jpg)
![DevHireX UI Preview](./demo%20images/6073393961013200196.jpg)
![DevHireX UI Preview](./demo%20images/6073393961013200194.jpg)
![DevHireX UI Preview](./demo%20images/6073393961013200192.jpg)
![DevHireX UI Preview](./demo%20images/6073393961013200191.jpg)
![DevHireX UI Preview](./demo%20images/6073393961013200190.jpg)

