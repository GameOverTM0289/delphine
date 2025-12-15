export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Store configuration
export const SHIPPING = {
  STANDARD: 8.99,
  EXPRESS: 15.99,
  INTERNATIONAL: 24.99,
  FREE_THRESHOLD: 100,
};

export const TAX_RATE = 0.20;

// Email validation regex - comprehensive
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Validate email
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  if (email.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for common typos
  const domain = email.split('@')[1]?.toLowerCase();
  const commonTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gnail.com': 'gmail.com',
    'hotmal.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
  };
  
  if (domain && commonTypos[domain]) {
    return { 
      valid: false, 
      error: `Did you mean @${commonTypos[domain]}?` 
    };
  }
  
  return { valid: true };
}

// Phone number validation
export function validatePhone(phone: string, countryCode: string): { valid: boolean; error?: string } {
  if (!phone) {
    return { valid: false, error: 'Phone number is required' };
  }
  
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: 'Phone number should contain only digits' };
  }
  
  // Check length based on country
  const minLength = getMinPhoneLength(countryCode);
  const maxLength = getMaxPhoneLength(countryCode);
  
  if (cleaned.length < minLength) {
    return { valid: false, error: `Phone number is too short (min ${minLength} digits)` };
  }
  
  if (cleaned.length > maxLength) {
    return { valid: false, error: `Phone number is too long (max ${maxLength} digits)` };
  }
  
  return { valid: true };
}

function getMinPhoneLength(countryCode: string): number {
  const minLengths: Record<string, number> = {
    'AL': 8, 'AT': 10, 'BE': 9, 'BG': 8, 'HR': 8, 'CY': 8, 'CZ': 9,
    'DK': 8, 'EE': 7, 'FI': 9, 'FR': 9, 'DE': 10, 'GR': 10, 'HU': 9,
    'IE': 9, 'IT': 9, 'LV': 8, 'LT': 8, 'LU': 9, 'MT': 8, 'NL': 9,
    'PL': 9, 'PT': 9, 'RO': 9, 'SK': 9, 'SI': 8, 'ES': 9, 'SE': 9,
    'GB': 10, 'US': 10, 'CA': 10, 'AU': 9, 'NZ': 8, 'CH': 9, 'NO': 8,
    'XK': 8, 'MK': 8, 'ME': 8, 'RS': 8, 'BA': 8, 'TR': 10, 'UA': 9,
  };
  return minLengths[countryCode] || 7;
}

function getMaxPhoneLength(countryCode: string): number {
  const maxLengths: Record<string, number> = {
    'AL': 9, 'AT': 13, 'BE': 10, 'BG': 9, 'HR': 10, 'CY': 8, 'CZ': 9,
    'DK': 8, 'EE': 8, 'FI': 11, 'FR': 10, 'DE': 12, 'GR': 10, 'HU': 9,
    'IE': 11, 'IT': 11, 'LV': 8, 'LT': 8, 'LU': 11, 'MT': 8, 'NL': 9,
    'PL': 9, 'PT': 9, 'RO': 10, 'SK': 9, 'SI': 8, 'ES': 9, 'SE': 10,
    'GB': 11, 'US': 10, 'CA': 10, 'AU': 9, 'NZ': 10, 'CH': 9, 'NO': 8,
    'XK': 8, 'MK': 8, 'ME': 8, 'RS': 9, 'BA': 8, 'TR': 10, 'UA': 9,
  };
  return maxLengths[countryCode] || 15;
}

// Phone prefixes for all countries - Albania first (default)
export const PHONE_PREFIXES = [
  { code: 'AL', prefix: '+355', name: 'Albania', flag: '🇦🇱' },
  { code: 'AF', prefix: '+93', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'DZ', prefix: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AD', prefix: '+376', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AO', prefix: '+244', name: 'Angola', flag: '🇦🇴' },
  { code: 'AR', prefix: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', prefix: '+374', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AU', prefix: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', prefix: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', prefix: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BH', prefix: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', prefix: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BY', prefix: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BE', prefix: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BA', prefix: '+387', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
  { code: 'BR', prefix: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BG', prefix: '+359', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'CA', prefix: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'CL', prefix: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', prefix: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'CO', prefix: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: 'HR', prefix: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CY', prefix: '+357', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', prefix: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', prefix: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', prefix: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: 'EE', prefix: '+372', name: 'Estonia', flag: '🇪🇪' },
  { code: 'FI', prefix: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', prefix: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'GE', prefix: '+995', name: 'Georgia', flag: '🇬🇪' },
  { code: 'DE', prefix: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'GR', prefix: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: 'HK', prefix: '+852', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', prefix: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', prefix: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', prefix: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'ID', prefix: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', prefix: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', prefix: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', prefix: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', prefix: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', prefix: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', prefix: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', prefix: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', prefix: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', prefix: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: 'XK', prefix: '+383', name: 'Kosovo', flag: '🇽🇰' },
  { code: 'KW', prefix: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'LV', prefix: '+371', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', prefix: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LY', prefix: '+218', name: 'Libya', flag: '🇱🇾' },
  { code: 'LI', prefix: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', prefix: '+370', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', prefix: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MK', prefix: '+389', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'MY', prefix: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MT', prefix: '+356', name: 'Malta', flag: '🇲🇹' },
  { code: 'MX', prefix: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'MD', prefix: '+373', name: 'Moldova', flag: '🇲🇩' },
  { code: 'MC', prefix: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: 'ME', prefix: '+382', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'MA', prefix: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: 'NL', prefix: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', prefix: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NG', prefix: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NO', prefix: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', prefix: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', prefix: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PS', prefix: '+970', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PE', prefix: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', prefix: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', prefix: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', prefix: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', prefix: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', prefix: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', prefix: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: 'SA', prefix: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'RS', prefix: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SG', prefix: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', prefix: '+421', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', prefix: '+386', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'ZA', prefix: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KR', prefix: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: 'ES', prefix: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', prefix: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', prefix: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SY', prefix: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: 'TW', prefix: '+886', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TH', prefix: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TN', prefix: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', prefix: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: 'UA', prefix: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', prefix: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', prefix: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', prefix: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'UY', prefix: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'UZ', prefix: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VE', prefix: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', prefix: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'YE', prefix: '+967', name: 'Yemen', flag: '🇾🇪' },
];

// Get image URL - handles both local and external images
export function getImageUrl(path: string): string {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // If it's a local path, ensure it starts with /
  return path.startsWith('/') ? path : `/${path}`;
}

// Generate random order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DLP-${timestamp}-${random}`;
}

// Slugify string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

// Debounce function
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
