const blacklistEmails = new Set();
const lastUpdateDate = null;

export async function isEmailValid(email: string): Promise<boolean> {
  await loadBlacklist();

  const [_, domain] = email.split("@");

  return !blacklistEmails.has(domain);
}

async function loadBlacklist() {
  const response = await fetch(
    "https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt",
  );
  const text = await response.text();
  for (const domain of text.split("\n")) {
    blacklistEmails.add(domain);
  }
}
