// Sri Ganesh Enterprises — B2B Pricing & Tax Calculation System
// Structures checkout and cart calculations for future Admin compatibility

export interface AdminPricingSettings {
  gstPercentage: number;
  cgstPercentage: number;
  sgstPercentage: number;
  igstPercentage: number;
  shippingCharge: number;
  deliveryCharge: number;
  discountPercentage: number;
  freeShippingThreshold: number;
  couponCodes: { code: string; discountPercentage: number }[];
}

// Default B2B pricing settings. Keep all additional charges disabled (0) for now.
// Subtotal = Grand Total. Future charges will be managed through the Admin Panel.
export const defaultPricingSettings: AdminPricingSettings = {
  gstPercentage: 0,
  cgstPercentage: 0,
  sgstPercentage: 0,
  igstPercentage: 0,
  shippingCharge: 0,
  deliveryCharge: 0,
  discountPercentage: 0,
  freeShippingThreshold: 0, // 0 means disabled
  couponCodes: [],
};

export function getPricingSettings(): AdminPricingSettings {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("admin_pricing_settings");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse pricing settings, falling back to default", e);
    }
  }
  return defaultPricingSettings;
}

export function calculateOrderDetails(subtotal: number, settings = getPricingSettings()) {
  const gst = Math.round((subtotal * settings.gstPercentage) / 100);
  const cgst = Math.round((subtotal * settings.cgstPercentage) / 100);
  const sgst = Math.round((subtotal * settings.sgstPercentage) / 100);
  const igst = Math.round((subtotal * settings.igstPercentage) / 100);

  // Check if free shipping is applicable
  const isFreeShipping = settings.freeShippingThreshold > 0 && subtotal >= settings.freeShippingThreshold;
  const shipping = isFreeShipping ? 0 : settings.shippingCharge;
  const delivery = settings.deliveryCharge;

  // Discount calculations
  const discount = Math.round((subtotal * settings.discountPercentage) / 100);

  const grandTotal = subtotal + gst + cgst + sgst + igst + shipping + delivery - discount;

  return {
    subtotal,
    gst,
    cgst,
    sgst,
    igst,
    shipping,
    delivery,
    discount,
    grandTotal,
    hasGst: settings.gstPercentage > 0,
    hasShipping: settings.shippingCharge > 0 || settings.deliveryCharge > 0,
    hasDiscount: settings.discountPercentage > 0,
  };
}
