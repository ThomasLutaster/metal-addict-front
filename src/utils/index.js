import slugify from 'slugify';
import DOMPurify from 'dompurify';
/**
 * Get the slug
 * @param {String} text The text to get the slug for
 * @return the slug for the text
 */
export const getSlug = (text, id) => {
  // eslint-disable-next-line prefer-template
  const textToSlugify = text + '-' + id;

  return slugify(textToSlugify, {
    lower: true,
  });
};

export const getIdFromSlug = (slug) => {
  const index = slug.lastIndexOf('-');

  return (index === -1 ? '' : slug.substring(index + 1));
};

export const createYearArray = () => {
  const currentYear = (new Date(Date.now())).getFullYear();
  const yearArray = [];

  for (let year = currentYear; year > currentYear - 50; year -= 1) {
    yearArray.push({
      id: year,
      name: `${year}`,
    });
  }

  return yearArray;
};

export const getObjectByName = (name, array) => (
  array.find((item) => item.name.toLowerCase() === name.toLowerCase())
);

export const isObjectValid = (object) => (
  object === null || (object !== null && object.name !== undefined && object.id !== undefined)
);

export const checkMoreEventsInSetListApi = (object) => {
  if (object === null) {
    return false;
  }

  const total = Number(object.total);
  const itemsPerPage = Number(object.itemsPerPage);
  const page = Number(object.page);

  return total > itemsPerPage * page;
};

export const getUnifiedSetList = (set) => {
  const setList = [];
  let numb = 1;

  set.forEach((setElt) => {
    setElt.song.forEach((setSong) => {
      setList.push({
        numb,
        name: setSong.name,
      });
      numb += 1;
    });
  });

  return setList;
};

export const createMarkup = (htmlContent) => (
  { __html: DOMPurify.sanitize(htmlContent) }
);

export const checkUserParticipatedInEvent = (eventUsers, user) => {
  if (user === null) {
    return false;
  }
  return eventUsers.find((eventUser) => eventUser.id === user.id) !== undefined;
};

export const checkUserPublishedAnEventReview = (eventReviews, user) => {
  if (user === null) {
    return false;
  }
  return eventReviews.find((eventReview) => eventReview.user.id === user.id) !== undefined;
};

export const getFilteredAutocompletInputOptions = (options, inputValue) => (
  options.filter((option) => {
    const firstLetter = option.name.substring(0, 1);
    // eslint-disable-next-line max-len
    return option.name.toLowerCase().startsWith(inputValue.toLowerCase()) && firstLetter === firstLetter.toUpperCase();
  })
);
