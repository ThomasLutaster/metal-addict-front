import slugify from 'slugify';
import DOMPurify from 'dompurify';

import avatar from 'src/assets/images/avatar.jpg';
import band from 'src/assets/images/band.jpg';

/**
 * Get the slug
 * @param {String} text The text to get the slug for
 * @return the slug for the text
 */
export const getSlug = (text, id) => {
  const textToSlugify = `${text}-${id}`;

  return slugify(textToSlugify, {
    lower: true,
  });
};

export const getIdFromSlug = (slug) => {
  const index = slug.lastIndexOf('-');

  if (index === -1) {
    return 'NO_ID';
  }

  const id = slug.substring(index + 1).trim();

  return (id.length === 0 ? 'NO_ID' : id);
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

export const getUnifiedSetList = (event) => {
  const setList = [];

  if (event !== null) {
    let numb = 1;
    let song = '';

    event.setlist.sets.set.forEach((setElt) => {
      setElt.song.forEach((setSong) => {
        song = setSong.name.trim();
        if (song.length > 0) {
          setList.push({
            numb,
            name: setSong.name,
          });
          numb += 1;
        }
      });
    });
  }

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
    return slugify(option.name.toLowerCase()).startsWith(slugify(inputValue.toLowerCase())) && firstLetter === firstLetter.toUpperCase();
  })
);

export const pad = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

export const convertEventsIntoSetlistEvents = (events) => {
  const setlistApiEvents = {
    type: 'setlists',
    itemsPerPage: 20,
    page: 1,
    total: events.length,
    setlist: [],
  };

  events.forEach((event) => {
    const date = new Date(event.date);
    const eventDate = `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()}`;

    setlistApiEvents.setlist.push({
      id: event.setlistId,
      eventDate,
      artist: {
        name: event.band.name,
      },
      venue: {
        name: event.venue,
        city: {
          name: event.city,
          country: {
            name: event.country.name,
          },
        },
      },
    });
  });

  return setlistApiEvents;
};

export const isUserOwnerReview = (user, review) => (
  user !== null && review !== null && (review.user.id === user.id)
);

export const changeCityName = (cityName) => {
  switch (cityName) {
    case 'Ville-Lumière':
      return 'Paris';
    case 'Lutece':
      return 'Paris';
    default:
      return cityName;
  }
};

export const getAbsolutePicturePath = (path) => (
  `https://www.metaladdict.fr/${path}`
);

export const getAbsoluteAvatarPath = (path) => {
  if (path === null) {
    return avatar;
  }
  return `https://www.metaladdict.fr/${path}`;
};

export const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export const getBandPictureUrl = (picturesArray) => {
  if (picturesArray !== undefined && picturesArray.length > 0) {
    return picturesArray[getRandomInt(picturesArray.length)].url;
  }
  return band;
};

export const wordWrap = (text, length) => {
  if (text.length <= length) {
    return text;
  }

  const wordWrapText = text.substring(0, length);
  let indexOfSpace = text.lastIndexOf(' ');

  if (indexOfSpace === -1) {
    return `${wordWrapText}...`;
  }

  indexOfSpace = wordWrapText.lastIndexOf(' ');
  if (indexOfSpace === -1) {
    return `${wordWrapText}...`;
  }
  return `${wordWrapText.substring(0, indexOfSpace)}...`;
};

export const isDataValid = (text) => {
  let textToCheck = text;
  textToCheck = textToCheck.replace(/<p>/g, '');
  textToCheck = textToCheck.replace(/<\/p>/g, '');
  return textToCheck.trim().length > 0;
};
