interface Email {
  id: number;
  email: string;
}

interface Phone {
  id: number;
  phone: string;
}

interface Address {
  id: number;
  address: string;
}

export interface Contacts {
  id: number;
  day_end: string;
  day_start: string;
  emails: Email[];
  hour_end: string;
  hour_start: string;
  phones: Phone[];
  address: Address[];
}
