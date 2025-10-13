// URLs de acceso directo a los Spirits en ChatGPT
export const spiritAccessUrls: Record<string, string> = {
  'vinxi-spirit': 'https://chatgpt.com/g/g-6793be894a3081918b6f0bd51bebd0e2-vinxi-spirit-asistente-de-proyectos',
  'grilla-spirit': 'https://chatgpt.com/g/g-682be0b5113c819192070592c8ba70b9-grilla-spirit',
  'okro-spirit': 'https://chatgpt.com/g/g-682bbe62832481918c372799f48ccb96-okro-spirit',
  'tataroto-spirit': 'https://chatgpt.com/g/g-67bfaf381b80819187555a54dc3b7a1c-tataroto-spirit',
  'cryptopher-spirit': 'https://chatgpt.com/g/g-684dbc4238bc8191afff3e9f543f57a6-criptopher-spirit',
  'nosferatu-spirit': 'https://chatgpt.com/g/g-68a510c928dc8191a8b8d6d2c21bfb70-nosferatu-spirit-ntf-generator',
  'promptify-spirit': 'https://chatgpt.com/g/g-682d0b4673f081918b5ff09f8dad7ade-promptify-pro-para-bots'
};

export const getSpiritAccessUrl = (spiritSlug: string): string | undefined => {
  return spiritAccessUrls[spiritSlug];
};
