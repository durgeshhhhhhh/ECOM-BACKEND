if (result.error) {  // Changed from err to error
    return { error: result.error };  // Changed from err to error
  } else {
    return result.res;
  }