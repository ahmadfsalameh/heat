const scroll = (container, val) => {
  const scrollVal = window.innerHeight * val;
  container.scroll(0, scrollVal);
};

export default scroll;
