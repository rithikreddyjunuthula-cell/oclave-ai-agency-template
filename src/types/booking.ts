export interface BookingFieldCopy {
  label: string;
  placeholder: string;
}

export interface BookingFieldsCopy {
  name: BookingFieldCopy;
  email: BookingFieldCopy;
  bottleneck: BookingFieldCopy;
}

export interface BookingSuccessCopy {
  title: string;
  description: string;
  closeLabel: string;
}

export interface BookingFallbackCopy {
  prompt: string;
  email: string;
  copyLabel: string;
  copiedLabel: string;
  copyErrorLabel: string;
}

export interface BookingContent {
  title: string;
  description: string;
  fields: BookingFieldsCopy;
  submitLabel: string;
  privacyNote: string;
  success: BookingSuccessCopy;
  fallback: BookingFallbackCopy;
  closeLabel: string;
}
