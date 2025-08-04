export function persistPlugin({ store }) {
  const saved = localStorage.getItem(store.$id);
  if (saved) {
    store.$patch(JSON.parse(saved));
  }

  store.$subscribe((mutation, state) => {
    console.log('Save:', mutation.type, store.$id);
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
}
