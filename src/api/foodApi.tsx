import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer 9yAyquIoEc1CgMAPdsbtr8mTvMVCCW9fCKldl0yY2rD_rv4VN_5RFEJMld7l-T-Y_9FGR9gJyKNvLD8TnYgnVoGb1ZHlGK0y2nRJ309K4dr5Hj8VGDrJKi-7wyzhYXYx',
  },
});
