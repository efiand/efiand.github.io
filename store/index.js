export const strict = process.env.NODE_ENV !== `production`;

export const state = () => {
  return {
    lang: `ru`,
    hash: ``,
    postTopic: ``,
    isStorageSupport: false,
    browser: `chrome`
  };
};

export const mutations = {
  setlayout(storeState, layout) {
    storeState.layout = layout;
  },

  setHash(storeState, hash) {
    storeState.hash = hash;
  },

  setPostTopic(storeState, postTopic) {
    storeState.postTopic = postTopic;
  },

  setStorageSupport(storeState, isStorageSupport) {
    storeState.isStorageSupport = isStorageSupport;
  },

  setBrowser(storeState, browser) {
    storeState.browser = browser;
  }
};

export const actions = {
  nuxtServerInit(store) {
    store.commit(`setlayout`, require(`@/assets/data/layout.json`));
  }
};
