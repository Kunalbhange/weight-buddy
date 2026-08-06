// In-memory sliding window rate-limiter middleware
const requestMap = new Map();

export const createRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000; // 15 minutes default
  const maxRequests = options.max || 5; // 5 attempts per window default
  const message = options.message || 'Too many attempts. Please try again in 15 minutes to protect your account.';

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const key = `${req.path}:${ip}`;
    const now = Date.now();

    if (!requestMap.has(key)) {
      requestMap.set(key, []);
    }

    const timestamps = requestMap.get(key).filter(ts => now - ts < windowMs);
    timestamps.push(now);
    requestMap.set(key, timestamps);

    if (timestamps.length > maxRequests) {
      return res.status(429).json({ error: message, retryAfterSeconds: Math.ceil(windowMs / 1000) });
    }

    next();
  };
};
