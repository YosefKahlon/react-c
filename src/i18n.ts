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

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(storageKey)
  return stored || 'en'
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
