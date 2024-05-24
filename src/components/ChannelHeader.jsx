import { CHANNEL_TITLE, LOGO_URL } from "../utils/constant";

const ChannelHeader = () => {
  return (
    <div className="channel-header-container">
      <div className="channel-icon">
        <img src={LOGO_URL} />
      </div>
      <div className="channel-title">
        # <b>{CHANNEL_TITLE}</b>
      </div>
    </div>
  );
};

export default ChannelHeader;
