const blacklistEmails = new Set();
let loadingPromise: Promise<void> | null = null;
let loaded = false;

export async function isEmailValid(email: string): Promise<boolean> {
  if (!loaded) {
    loadingPromise = loadingPromise ?? loadBlacklist();
    await loadingPromise;
    loadingPromise = null;
    loaded = true;
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
      loadBlacklist().catch((e) => {
        console.error(e);
        loadBlacklist();
      });
    },
    1000 * 60 * 60,
  );
}
