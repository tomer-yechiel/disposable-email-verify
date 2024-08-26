
const blacklistEmails = new Set();
let loadingPromise: Promise<void> | null = null;

export async function isEmailValid(email: string): Promise<boolean> {
  loadingPromise = loadingPromise ?? loadBlacklist();

  if (blacklistEmails.size === 0) {
    await loadingPromise;
  }

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

  setTimeout(
    () => {
      loadingPromise = loadBlacklist();
    },
    1000 * 60 * 60 * 6,
  );
}
