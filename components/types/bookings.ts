export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  numberOfAdults: string;
  numberOfChildren: string; // include this if you want to keep the field
  numberOfRooms: string;
  extraBedRequested: boolean;
  roomsNeedingExtraBed: string;
  extraBedsPerRoom: string;
  couponCode: string;
}

export interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  roomType: string;
  roomId: string;
}
