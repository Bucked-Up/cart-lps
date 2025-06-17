const getTopLevelDomain = () => {
  const fullDomain = window.location.hostname;
  const domainRegex = /\.([a-z]{2,})\.([a-z]{2,})$/;
  const match = fullDomain.match(domainRegex);
  if (match) {
    return `.${match[1]}.${match[2]}`;
  } else {
    return fullDomain;
  }
};

const setCookies = ({couponCode,pageId}) => {
  const cookieConfig = `path=/; domain=${getTopLevelDomain()};max-age=3600`;
  document.cookie = `offer_id=${couponCode};${cookieConfig}`;
  document.cookie = `page_id=${pageId};${cookieConfig}`;
};

export default setCookies
