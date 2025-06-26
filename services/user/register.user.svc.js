if (!!res.error) {  // Changed from err to error
    return { error: res.error };  // Changed from err to error
  } else {
    return res.res;
  }