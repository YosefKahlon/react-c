import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    common: {
      appName: 'React Course Shop',
      home: 'Home',
      about: 'About',
      cart: 'Cart',
      filter: 'Filter',
      theme: 'Theme',
      language: 'Language',
      loading: 'Loading...',
      nav: {
        products: 'Products',
        about: 'About'
      },
      header: {
        filters: 'Filters',
        toggleFilters: 'Toggle filters',
        language: 'Language'
      },
      filters: {
        title: 'Filters',
        categories: 'Categories',
        all: 'All Products',
        clear: 'Clear All Filters',
        close: 'Close'
      }
    },
    form: {
      title: 'Registration',
      firstName: {
        label: 'First Name',
        error: {
          minLength: 'First name must be at least 2 characters'
        }
      },
      lastName: {
        label: 'Last Name',
        error: {
          minLength: 'Last name must be at least 2 characters'
        }
      },
      email: {
        label: 'Email',
        placeholder: 'name@example.com',
        error: {
          invalid: 'Invalid email address'
        }
      },
      password: {
        label: 'Password',
        error: {
          minLength: 'Password must be at least 6 characters'
        }
      },
      confirmPassword: {
        label: 'Confirm Password',
        error: {
          minLength: 'Password must be at least 6 characters'
        }
      },
      phoneNumber: {
        label: 'Phone Number',
        placeholder: '+1 555 123 4567'
      },
      age: {
        label: 'Age'
      },
      website: {
        label: 'Website',
        placeholder: 'https://example.com',
        error: {
          invalid: 'Invalid URL'
        }
      },
      bio: {
        label: 'Bio',
        placeholder: 'Tell us a bit about yourself...',
        help: '10–300 characters.',
        error: {
          minLength: 'At least 10 characters'
        }
      },
      country: {
        label: 'Country',
        options: {
          select: 'Select…',
          us: 'United States',
          il: 'Israel',
          uk: 'United Kingdom',
          ca: 'Canada',
          de: 'Germany'
        }
      },
      contactMethod: {
        legend: 'Preferred contact',
        email: 'Email',
        phone: 'Phone',
        none: 'None'
      },
      interests: {
        legend: 'Interests',
        frontend: 'Frontend',
        backend: 'Backend',
        devops: 'DevOps',
        uiux: 'UI/UX'
      },
      experienceLevel: {
        legend: 'Experience level',
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      subscribe: 'Subscribe to newsletter',
      agreeToTerms: 'I agree to the terms',
      passwords: {
        error: {
          mismatch: 'Passwords must match'
        }
      },
      required: 'required',
      submit: 'Register',
      submitting: 'Submitting...'
    },
    products: {
      title: 'Products',
      subtitle: 'Browse the catalog and view details',
      aboutLink: 'Need more details? <link>Visit the About page</link>.',
      status: {
        loading: 'Loading products...',
        empty: 'No products found',
        error: 'Failed to load products: {{message}}'
      },
      detailStatus: {
        loading: 'Loading product details...',
        error: 'Failed to load product details: {{message}}',
        notFound: 'Product not found',
        missingId: 'No product ID provided'
      },
      counts: {
        showing: 'Showing {{count}} products',
        category: 'in "{{category}}"'
      },
      productCount_one: '{{count}} product',
      productCount_other: '{{count}} products',
      fields: {
        title: 'Title',
        image: 'Image',
        price: 'Price',
        category: 'Category',
        brand: 'Brand',
        rating: 'Rating',
        stock: 'Stock',
        description: 'Description',
        actions: 'Actions'
      },
      toast: {
        added: 'Product added to favorites!',
        removed: 'Product removed from favorites',
        error: 'Failed to update favorites: {{message}}'
      },
      buttons: {
        favoriteAdd: 'Add to favorites',
        favoriteRemove: 'Remove from favorites',
        viewDetails: 'View details'
      }
    }
  },
  he: {
    common: {
      appName: 'חנות קורס ריאקט',
      home: 'דף הבית',
      about: 'אודות',
      cart: 'עגלה',
      filter: 'סינון',
      theme: 'ערכת נושא',
      language: 'שפה',
      loading: 'טוען...',
      nav: {
        products: 'מוצרים',
        about: 'אודות'
      },
      header: {
        filters: 'סינונים',
        toggleFilters: 'פתח או סגור סינונים',
        language: 'שפה'
      },
      filters: {
        title: 'סינונים',
        categories: 'קטגוריות',
        all: 'כל המוצרים',
        clear: 'נקה את כל הסינונים',
        close: 'סגור'
      }
    },
    form: {
      title: 'הרשמה',
      firstName: {
        label: 'שם פרטי',
        error: {
          minLength: 'שם פרטי חייב להיות לפחות 2 תווים'
        }
      },
      lastName: {
        label: 'שם משפחה',
        error: {
          minLength: 'שם משפחה חייב להיות לפחות 2 תווים'
        }
      },
      email: {
        label: 'דוא״ל',
        placeholder: 'name@example.com',
        error: {
          invalid: 'כתובת דוא״ל לא חוקית'
        }
      },
      password: {
        label: 'סיסמה',
        error: {
          minLength: 'סיסמה חייבת להיות לפחות 6 תווים'
        }
      },
      confirmPassword: {
        label: 'אישור סיסמה',
        error: {
          minLength: 'סיסמה חייבת להיות לפחות 6 תווים'
        }
      },
      phoneNumber: {
        label: 'מספר טלפון',
        placeholder: '+1 555 123 4567'
      },
      age: {
        label: 'גיל'
      },
      website: {
        label: 'אתר',
        placeholder: 'https://example.com',
        error: {
          invalid: 'URL לא חוקי'
        }
      },
      bio: {
        label: 'קצת עלי',
        placeholder: 'ספרו לנו קצת עליכם...',
        help: '10–300 תווים.',
        error: {
          minLength: 'לפחות 10 תווים'
        }
      },
      country: {
        label: 'מדינה',
        options: {
          select: 'בחרו…',
          us: 'ארצות הברית',
          il: 'ישראל',
          uk: 'בריטניה',
          ca: 'קנדה',
          de: 'גרמניה'
        }
      },
      contactMethod: {
        legend: 'דרך התקשרות מועדפת',
        email: 'דוא״ל',
        phone: 'טלפון',
        none: 'אף אחת'
      },
      interests: {
        legend: 'תחומי עניין',
        frontend: 'Frontend',
        backend: 'Backend',
        devops: 'DevOps',
        uiux: 'UI/UX'
      },
      experienceLevel: {
        legend: 'רמת ניסיון',
        beginner: 'מתחילים',
        intermediate: 'בינוני',
        advanced: 'מתקדם'
      },
      subscribe: 'הרשמו לעדכונים',
      agreeToTerms: 'אני מסכים/ה לתנאים',
      passwords: {
        error: {
          mismatch: 'הסיסמאות חייבות להיות זהות'
        }
      },
      required: 'חובה',
      submit: 'הרשם',
      submitting: 'מעביר...'
    },
    products: {
      title: 'מוצרים',
      subtitle: 'עיינו בקטלוג וצפו בפרטים',
      aboutLink: 'רוצים עוד פרטים? <link>עברו לעמוד האודות</link>.',
      status: {
        loading: 'טוען מוצרים...',
        empty: 'לא נמצאו מוצרים',
        error: 'טעינת המוצרים נכשלה: {{message}}'
      },
      detailStatus: {
        loading: 'טוען פרטי מוצר...',
        error: 'טעינת פרטי המוצר נכשלה: {{message}}',
        notFound: 'המוצר לא נמצא',
        missingId: 'לא סופק מזהה מוצר'
      },
      counts: {
        showing: 'מציג {{count}} מוצרים',
        category: 'בקטגוריה "{{category}}"'
      },
      productCount_one: '{{count}} מוצר',
      productCount_other: '{{count}} מוצרים',
      fields: {
        title: 'שם',
        image: 'תמונה',
        price: 'מחיר',
        category: 'קטגוריה',
        brand: 'מותג',
        rating: 'דירוג',
        stock: 'מלאי',
        description: 'תיאור',
        actions: 'פעולות'
      },
      toast: {
        added: 'המוצר נוסף למועדפים!',
        removed: 'המוצר הוסר מהמועדפים',
        error: 'עדכון המועדפים נכשל: {{message}}'
      },
      buttons: {
        favoriteAdd: 'הוסף למועדפים',
        favoriteRemove: 'הסר מהמועדפים',
        viewDetails: 'צפה בפרטים'
      }
    }
  }
} as const

const storageKey = 'appLanguage'

export const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(storageKey)
  return stored || 'en'
}

export const isRtlLang = (lang: string): boolean => {
  return lang === 'he'
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    supportedLngs: ['en', 'he'],
    ns: ['common', 'products'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
export type AppLanguages = keyof typeof resources
export { storageKey as LANGUAGE_STORAGE_KEY }
