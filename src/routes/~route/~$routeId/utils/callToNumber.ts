/**
 * Initiate a phone call.
 * @param phoneNumber - phone number. Prefix is allowed.
 */
export function callToNumber(phoneNumber: number) {
  window.open(`tel:${phoneNumber.toString()}`, "_self");
}
