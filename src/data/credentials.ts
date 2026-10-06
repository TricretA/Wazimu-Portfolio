export interface Credential {
  slug: string;
  title: string;
  issuer: string;
  awardedTo: string;
  issued: string;
  validThrough: string;
  certificateId: string;
  description: string;
  /**
   * Accredible's embed endpoint, not a verification page — it resolves to a
   * signed, short-lived image URL on every request, so it is safe to link to
   * directly rather than mirroring the file locally.
   */
  imageUrl: string;
}

export const credentials: Credential[] = [
  {
    slug: 'google-play-academy-ignite',
    title: 'Google Play Academy Ignite',
    issuer: 'Google Play Academy',
    awardedTo: 'Tricreta',
    issued: '27 September 2026',
    validThrough: '27 September 2027',
    certificateId: '196307485',
    description:
      "Completed Google Play Academy's five-part Ignite learning plan, focused on avoiding common launch pitfalls, building user trust, and preparing for long-term success on Google Play.",
    imageUrl:
      'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/196307485'
  }
];
