(() => {
  const observer = new MutationObserver(() => {
    const prDescriptions = document.getElementsByClassName('comment-body');
    const description = prDescriptions[0].innerText;

    const messageField = document.getElementById('merge_message_field');
    if (prDescriptions.length === 0 || messageField === null) {
      return;
    }

    const originalMessage = messageField.value;
    const preservedContent = new Set();
    for (const [, author] of originalMessage.matchAll(
      /co-authored-by: ([^\n]+)/gi
    )) {
      preservedContent.add('Co-authored-by: ' + author);
    }

    const newMessage = description + '\n\n' + [...preservedContent].join('\n');
    document.addEventListener('details:toggled', (e) => {
      messageField.value = newMessage.trim();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
