import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoConferencing() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let myMeeting = async (element) => {

 // generate Kit Token
 const appID = 103310805;
 const serverSecret = "16d5e09e3c83b4a5118b0d92c5cac611";
 const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

 // Create instance object from Kit Token.
 const zp = ZegoUIKitPrebuilt.create(kitToken);
 // start the call
 zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
         mode: ZegoUIKitPrebuilt.VideoConference,
        },

        // Additional room view configurations
    showTurnOffRemoteCameraButton: true,
    showTurnOffRemoteMicrophoneButton: true,
    showMyCameraToggleButton: true,
    showMyMicrophoneToggleButton: true,
    showAudioVideoSettingsButton: true,
    showTextChat: true,
    showUserList: true,
    showRemoveUserButton: true,
    lowerLeftNotification: {
        showUserJoinAndLeave: true,
        showTextChat: true,
    },
    branding: {
        logoURL: 'your_logo_url_here',
    },
    layout: 'Auto',
    showLayoutButton: true,
    showNonVideoUser: true,
    showOnlyAudioUser: true,
    sharedLinks: [
        {
            name: 'Personal link',
            url:
                window.location.protocol + '//' +
                window.location.host + window.location.pathname +
                '?roomID=' +
                roomID,
        },
    ],
    showScreenSharingButton: true,
    showPinButton: true,
    whiteboardConfig: {
        showAddImageButton: true,
        showCreateAndCloseButton: true,
    },
    showRoomTimer: true,
    showRoomDetailsButton: true,
    showInviteToCohostButton: true,
    showRemoveCohostButton: true,
    showRequestToCohostButton: true,
    rightPanelExpandedType: 'None',
    autoHideFooter: true,
    enableUserSearch: false,

   });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}