import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ScaleLoader from 'react-spinners/ScaleLoader';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Edit } from 'react-feather';
import { getIdFromSlug, getAbsoluteAvatarPath } from 'src/utils';

import Events from 'src/containers/Events';
import Reviews from 'src/components/Reviews';
import Pictures from 'src/components/Pictures';
import UploadPicture from 'src/components/UploadPicture';
import { Back } from 'src/components/Icons';

import { SECONDARY_COLOR } from 'src/styles/vars';

import './profile.scss';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Profile = ({
  loadingUploadAvatar,
  manageUploadAvatar,
  user,
  isConnectedUser,
  userEvents,
  userReviews,
  userPictures,
  loadUserDatas,
  eventsLoading,
  reviewsLoading,
  picturesLoading,
  userLoading,
}) => {
  const { slug } = useParams();
  const userId = getIdFromSlug(slug);
  const history = useHistory();

  useEffect(() => {
    loadUserDatas(userId, history);
  }, []);

  const handleBackToOnClick = () => {
    history.goBack();
  };

  const [showEvents, setShowEvents] = useState(false);
  const handleEventsOnClick = () => {
    setShowEvents(!showEvents);
  };

  const [showReviews, setShowReviews] = useState(false);
  const handleReviewsOnClick = () => {
    setShowReviews(!showReviews);
  };

  const [showPictures, setShowPictures] = useState(false);
  const handlePicturesOnClick = () => {
    setShowPictures(!showPictures);
  };

  const EventsCssClass = classNames('eventsNoShow', {
    eventsShow: showEvents,
  });

  const ReviewsCssClass = classNames('reviewsNoShow', {
    reviewsShow: showReviews,
  });

  const PicturesCssClass = classNames('picturesNoShow', {
    picturesShow: showPictures,
  });

  if (user.biography === null) {
    user.biography = 'Description non renseign??e';
  }

  return (
    <div className="profile">
      {userLoading && (
        <div className="loader">
          <ScaleLoader color={SECONDARY_COLOR} />
        </div>
      )}
      {!userLoading && (
        <>
          <a onClick={handleBackToOnClick}>
            <Back className="back-to" />
          </a>
          <div className="user">
            <div className="user-identity">
              <div className="avatar">
                <div className="user-picture">
                  {
                    user.avatar !== undefined && <img src={getAbsoluteAvatarPath(user.avatar)} alt="" className="picture-content" />
                  }
                </div>
                {
                  isConnectedUser && (
                    <div className="user-action">
                      <Link
                        to={`/utilisateur/editer/${slug}`}
                      >
                        <Edit className="user-edit" />
                      </Link>
                      <UploadPicture
                        className="upload-avatar"
                        loading={loadingUploadAvatar}
                        manageSubmit={manageUploadAvatar}
                      />
                    </div>
                  )
                }
              </div>
              <h2 className="user-nickname">{user.nickname}</h2>
            </div>
            <div className="user-description">{user.biography}</div>
          </div>
          <div className="user-main-content">
            <div onClick={handleEventsOnClick} className="label-events">Concerts ({userEvents.length})</div>
            <div className={EventsCssClass}>
              {eventsLoading && <ScaleLoader color={SECONDARY_COLOR} />}
              {!eventsLoading && <Events events={userEvents} moreEvents={false} showMoreData />}
            </div>
            <div onClick={handleReviewsOnClick} className="label-reviews">Chroniques ({userReviews.length})</div>
            <div className={ReviewsCssClass}>
              {reviewsLoading && <ScaleLoader color={SECONDARY_COLOR} />}
              {!reviewsLoading && <Reviews reviews={userReviews} />}
            </div>
            <div onClick={handlePicturesOnClick} className="label-pictures">Photos ({userPictures.length})</div>
            <div className={PicturesCssClass}>
              {picturesLoading && <ScaleLoader color={SECONDARY_COLOR} />}
              {!picturesLoading && <Pictures pictures={userPictures} picturesOnScreen={8} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  loadingUploadAvatar: PropTypes.bool.isRequired,
  manageUploadAvatar: PropTypes.func.isRequired,
  userEvents: PropTypes.array.isRequired,
  userReviews: PropTypes.array.isRequired,
  userPictures: PropTypes.array.isRequired,
  loadUserDatas: PropTypes.func.isRequired,
  eventsLoading: PropTypes.bool.isRequired,
  reviewsLoading: PropTypes.bool.isRequired,
  picturesLoading: PropTypes.bool.isRequired,
  userLoading: PropTypes.bool.isRequired,
  isConnectedUser: PropTypes.bool.isRequired,
};

export default Profile;
