import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import MBTIModal from './MBTIModal';
import { useUser } from '@clerk/clerk-react';
import { useUserContext } from '../contexts/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import XIcon from '@mui/icons-material/X';
import { styled } from '@mui/material/styles';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

// スタイル付きアイコンの定義
const StyledMoreVertIcon = styled(MoreVertIcon)({
  fontSize: 35,
});

const StyledXIcon = styled(XIcon)({
  fontSize: 40,
});

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [mbtiType, setMbtiType] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を追加
  const [showMBTIModal, setShowMBTIModal] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userMbtiType, setUserMbtiType] = useState(null);

  const { user: currentUser } = useUser();
  const { isProfileUpdated } = useUserContext();
  const { clerkId } = useParams();
  const navigate = useNavigate();

  let API_URL;
  if (window.location.origin === 'http://localhost:3001') {
    API_URL = 'http://localhost:3000';
  } else if (window.location.origin === 'https://www.mbti-database.com') {
    API_URL = 'https://api.mbti-database.com';
  } else {
    API_URL = 'http://localhost:3000';
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const targetClerkId = clerkId || currentUser?.id;
    if (targetClerkId) {
      fetch(`${API_URL}/api/v1/users/${targetClerkId}`)
        .then((response) => response.json())
        .then((data) => {
          setProfile({
            username: data.username,
            avatarUrl: data.avatar_url,
            clerkId: data.clerk_id,
          });
        });

      fetch(`${API_URL}/api/v1/mbti/${targetClerkId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.mbti_type) {
            setMbtiType(data);
          }
          setIsLoading(false); // データ取得後にローディング状態を解除
          setUserMbtiType(data.mbti_type);
        });

      fetch(`${API_URL}/api/v1/users/${targetClerkId}/posts`)
        .then((response) => response.json())
        .then((posts) => {
          setUserPosts(posts);
          posts.forEach((post) => {
            fetch(`${API_URL}/api/v1/posts/${post.id}/media_works`)
              .then((response) => response.json())
              .then((mediaWorks) => {
                setUserPosts((prevPosts) =>
                  prevPosts.map((p) => (p.id === post.id ? { ...p, mediaWorks } : p))
                );
              });
          });
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          // エラーハンドリングを行う（例：エラーメッセージを表示する）
        });
    }
  }, [API_URL, currentUser, clerkId, isProfileUpdated]);

  const [selectedSection, setSelectedSection] = useState('posts');

  const selectSection = (section) => {
    setSelectedSection(section);
  };

  const getSelectedStyle = (section) => {
    if (selectedSection === section) {
      return 'border-b-4 border-[#2EA9DF] w-1/2 mx-auto rounded-lg';
    }
    return '';
  };

  const renderImages = (works) => {
    const containerClass = `image-container-${works.length}`;

    return (
      <div className={containerClass}>
        {works.map((work, index) => (
          <Image
            key={index}
            cloudName="dputyeqso"
            publicId={work.image}
            className={`
              ${works.length === 1 ? 'w-[250px] h-[250px] md:w-[500px] md:h-[500px]' : 'w-[122.5px] h-[122.5px] md:w-[247.5px] md:h-[247.5px]'}
            `}
          />
        ))}
      </div>
    );
  };

  const renderUserDetails = (post, createdAt, postId) => {
    if (!profile) {
      console.error('profile is undefined', { postId, createdAt });
      return null;
    }

    const dateOptions = { month: 'long', day: 'numeric' };
    const formattedDate = new Date(createdAt).toLocaleDateString('ja-JP', dateOptions);

    return (
      <div className="flex items-center justify-between md:pl-16 lg:pl-32">
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/users/${profile.clerkId || ''}`);
            }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden md:w-20 md:h-20">
              <img
                src={profile.avatarUrl || 'デフォルトのアバター画像URL'}
                alt={`profileImage`}
                className="w-full h-full object-cover transition-all duration-300 hover:brightness-90"
              />
            </div>
            <div className="ml-2 md:ml-4">
              <h1>
                <span className="text-lg font-medium md:font-normal hover:underline cursor-pointer md:text-2xl">
                  {profile.username || 'Unknown User'}
                </span>
              </h1>
            </div>
          </div>
          <span className="ml-2 hover:underline cursor-pointer md:ml-4">{formattedDate}</span>
        </div>
        {currentUser?.id === profile.clerkId && (
          <div className="md:mr-16 lg:mr-32 relative">
            <div
              className="hover:bg-gray-200 p-2 rounded-full inline-block cursor-pointer"
              onClick={(event) => handleClick(event, postId)}
            >
              <StyledMoreVertIcon />
            </div>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                },
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleDeleteClick}>
                <DeleteOutlineOutlinedIcon fontSize="small" className="mr-2" />
                削除
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  };

  const handleClick = (event, postId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setDeletePostId(postId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    handleClose();
  };

  const handleDeletePost = () => {
    console.log('Deleting post with ID:', deletePostId);
    if (deletePostId) {
      fetch(`${API_URL}/api/v1/posts/${deletePostId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // 投稿が正常に削除された場合、投稿リストからの投稿を削除
            setUserPosts(userPosts.filter((post) => post.id !== deletePostId));
            setOpenDialog(false); // ダイログを閉じる
            // こスナックバーを表示するなど処理追加できます
          } else {
            // エラーハンドリング
            console.error('Failed to delete the post');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    handleCloseDialog();
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'posts':
        return (
          <div>
            {[...userPosts].reverse().map((post) => (
              <React.Fragment key={post.id}>
                <div onClick={() => navigate(`/posts/${post.id}`)} className="cursor-pointer">
                  <div className="mt-5">{renderUserDetails(post, post.created_at, post.id)}</div>
                  <div className="mb-3 md:mb-5">
                    <div className="text-base px-12 w-full text-center md:text-xl md:px-36 lg:px-52">
                      {profile.username}
                      {/* visibilityがis_publicの場合のみMBTIタイプを表示 */}
                      {userMbtiType && mbtiType?.visibility === 'is_public' && `(${userMbtiType})`}
                      の好きな
                      {post.mediaWorks && post.mediaWorks[0] ? (
                        <>
                          {post.mediaWorks[0].media_type === 'anime'
                            ? 'アニメ'
                            : '音楽アーティスト'}
                        </>
                      ) : (
                        ''
                      )}
                      は
                      {post.mediaWorks &&
                        post.mediaWorks
                          .map(
                            (work, index, array) =>
                              `${work.title}${index < array.length - 1 ? '、' : ''}`
                          )
                          .join('')}
                      です！
                    </div>
                  </div>
                  <div className="relative w-full mb-3 md:mb-5">
                    <div className="flex justify-center">
                      <div className="bg-black">
                        {post.mediaWorks && renderImages(post.mediaWorks)}
                      </div>
                    </div>
                    {currentUser?.id === profile.clerkId && (
                      <div
                        className="absolute bottom-0 right-0 rounded-full hover:bg-gray-200 cursor-pointer md:left-[700px] lg:left-[1270px] w-12 h-12 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareToX(post);
                        }}
                      >
                        <StyledXIcon />
                      </div>
                    )}
                  </div>
                </div>
                <hr className="border-t border-[#2EA9DF] w-screen -mx-4 md:-mx-0" />
              </React.Fragment>
            ))}
          </div>
        );
      case 'comments':
        return (
          <div className="text-center mt-4 md:mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            実装予定
          </div>
        );
      case 'likes':
        return (
          <div className="text-center mt-4 md:mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            実装予定
          </div>
        );
      default:
        return null;
    }
  };

  const shareToX = (post) => {
    const ogPageUrl = `${API_URL}/api/v1/ogp_page/${post.id}`;
    let artistText = '';

    if (post.mediaWorks && post.mediaWorks[0]) {
      const mediaType = post.mediaWorks[0].media_type === 'anime' ? 'アニメ' : '音楽アーティスト';
      // visibilityがis_publicの場合のみMBTIタイプを表示
      const mbtiTypeText =
        userMbtiType && mbtiType?.visibility === 'is_public' ? `(${userMbtiType})` : '';
      artistText = `${profile.username}${mbtiTypeText}の好きな${mediaType}は${post.mediaWorks
        .map((work, index, array) => `${work.title}${index < array.length - 1 ? '、' : ''}`)
        .join('')}です！`;

      const hashtag = '#MBTIデータベース';
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        artistText + '\n\n' + hashtag + '\n'
      )}&url=${encodeURIComponent(ogPageUrl)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    handleOpenDialog();
  };

  return (
    <div className="flex flex-col w-full px-4 md:px-0">
      {profile && (
        <>
          <div className="flex items-center justify-between w-full pt-8 md:pt-8 md:px-8">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full overflow-hidden md:w-24 md:h-24">
                <img
                  src={profile?.avatarUrl}
                  alt="User profile"
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
            </div>
            <div className="ml-4 md:ml-8">
              <h1>
                <span className="text-xl md:text-2xl">{profile.username}</span>{' '}
                <span className="ml-2 md:ml-4">
                  {mbtiType?.visibility === 'is_public' && mbtiType.mbti_type}
                </span>
              </h1>
            </div>
            <div className="ml-auto mb-4 md:mb-12 mr-4 md:mr-16 lg:mr-20">
              {(!clerkId || clerkId === currentUser?.id) && (
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => setShowMBTIModal(true)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-8 md:mt-16 w-full">
            <div
              className="flex-1 text-center cursor-pointer sidebar-link"
              onClick={() => selectSection('posts')}
            >
              <span className="text-lg md:text-xl">ポスト</span>
              <div className={getSelectedStyle('posts')}></div>
            </div>
            <div
              className="flex-1 text-center cursor-pointer sidebar-link"
              onClick={() => selectSection('comments')}
            >
              <span className="text-lg md:text-xl">コメント</span>
              <div className={getSelectedStyle('comments')}></div>
            </div>
            <div
              className="flex-1 text-center cursor-pointer sidebar-link"
              onClick={() => selectSection('likes')}
            >
              <span className="text-lg md:text-xl">いいね</span>
              <div className={getSelectedStyle('likes')}></div>
            </div>
          </div>
          <hr className="border-t border-[#2EA9DF] w-screen -mx-4 md:-mx-0" />
          {renderContent()}
        </>
      )}
      {showMBTIModal && (!clerkId || clerkId === currentUser?.id) && !isLoading && (
        <MBTIModal
          onClose={() => setShowMBTIModal(false)}
          onUpdate={(newMbtiType, newVisibility) => {
            // MBTIタイプを更新するAPIリクエストを送信
            fetch(`${API_URL}/api/v1/mbti/${currentUser.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mbti_type: newMbtiType,
                visibility: newVisibility,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                // 更新後のMBTIイプとvisibilityを状態に反映
                setMbtiType({
                  mbti_type: data.mbti_type,
                  visibility: data.visibility,
                });
              })
              .catch((error) => {
                console.error('Error updating MBTI type:', error);
              });
          }}
          initialMBTI={mbtiType ? mbtiType.mbti_type : ''}
          initialVisibility={mbtiType ? mbtiType.visibility : 'is_public'}
        />
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ invisible: true }}
        PaperProps={{
          style: {
            boxShadow:
              '0px 1px 3px -1px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.06), 0px 1px 1px -1px rgba(0,0,0,0.04)',
            borderRadius: '16px',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{'ポストの削除'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ポストを完全に削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              borderRadius: '20px',
              ':hover': {
                boxShadow: '0px 4px 20px rgba(173, 216, 230, 1)',
              },
            }}
          >
            キャンセル
          </Button>
          <Button
            onClick={handleDeletePost}
            autoFocus
            sx={{
              borderRadius: '20px',
              ':hover': {
                boxShadow: '0px 4px 20px rgba(173, 216, 230, 1)',
              },
            }}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
