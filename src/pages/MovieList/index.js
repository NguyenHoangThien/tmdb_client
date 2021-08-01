import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Page from 'components/Page/Page';
import { Card, Row, Col, Tabs, Button, Progress } from 'antd';
import { getLists } from './actions';

const { TabPane } = Tabs;

const imagePrefix = 'https://www.themoviedb.org/t/p/w220_and_h330_face/';
const mapDispatchToProps = {
  getListsAction: getLists
};

const formatDate = (dateString) => {
  if (!dateString) return 'Not Available';
  const date = moment(dateString);
  return date.format('MMMM Do YYYY');
}

const defineStrokeColor = (value) => {
  if (value > 70) return "green";
  if (value > 40) return "orange"
  return "red"
}

const displayMovies = (listMovie) => (
  <Row gutter={[16, 16]}>
  {
    listMovie.map(({
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count,
    }) => (
      <Col className="gutter-row" xxl={3} xl={4} lg={6} md={8} xs={12} key={id}>
        <Link to={`/movies/${id}`}>
          <Card
            bordered={false}
            hoverable
            cover={<img alt="example" src={`${imagePrefix}/${poster_path}`} style={{ borderRadius: 10 }} />}
            style={{position: 'relative'}}
          >
            <h4><a href={`/movies/${id}`}> {title} </a></h4>
            <span className="ant-card-meta-description">{formatDate(release_date)}</span>
            <div style={{ position: 'absolute', top: 242, left: 5, background: 'white', borderRadius: 30 }}><Progress type="circle" percent={vote_average*10} width={35} strokeColor={defineStrokeColor(vote_average*10)} style={{ color: 'white' }}/></div>
          </Card>
        </Link>
      </Col>
    ))
  }
  </Row>
)

const tabTypes = {
  Popular: 'Popular',
  Latest: 'Latest'
};

const MovieList = ({
  getListsAction
}) => {
  const [listMoviePopular, setListMoviePopular] = useState([]);
  const [pagePopular, setPagePopular] = useState(1);
  const [pageLatest, setPageLatest] = useState(1);
  const [listMovieLatest, setListMovieLatest] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [tabType, setTabType] = useState(tabTypes.Popular);
  const [poster, setPoster] = useState(null);

  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const fetchListMovie = async (tabType = tabTypes.Popular, page) => {
    const listMovie = await getListsAction({ type: tabType, page });
    if (tabType === tabTypes.Popular) {
      setListMoviePopular([...listMoviePopular, ...listMovie]);
    } else {
      setListMovieLatest([...listMoviePopular, ...listMovie]);
    }
    if (!poster) {
      setPoster(getRandomItem(listMovie));
    }
  }

  const loadMoreMovie = async (tabType) => {
    const page = tabType === tabTypes.Popular ? pagePopular : pageLatest;
    tabType === tabTypes.Popular ? setPagePopular(pagePopular + 1) : setPageLatest(pageLatest + 1);
    setLoadMore(true);
    await fetchListMovie(tabType, page + 1);
    setLoadMore(false);
  }

  useEffect(() => {
    fetchListMovie(tabTypes.Popular, pagePopular);
    fetchListMovie(tabTypes.Latest, pageLatest);
    // eslint-disable-next-line
  }, []);

  const onChangeTab = (tabType) => {
    setTabType(tabType);
  }

  return (
    <Page helmet="Latest & Popular Movie">
      {poster &&
        <Link to={`/movies/${poster.id}`}>
          <section style={{
            minHeight: '300px',
            height: 'calc(100vh / 2.5)',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
            marginBottom: 10,
            backgroundImage: `url("https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/${poster.poster_path || poster.backdrop_path}")`
          }}>
          </section>
        </Link>
      }
      <Tabs defaultActiveKey={tabType} onChange={onChangeTab}>
        <TabPane tab={tabTypes.Popular} key={tabTypes.Popular}>
          {displayMovies(listMoviePopular)}
        </TabPane>
        <TabPane tab={tabTypes.Latest} key={tabTypes.Latest}>
          {displayMovies(listMovieLatest)}
        </TabPane>
      </Tabs>
      <div style={{ textAlign: 'center', paddingBottom: 50 }}> <Button type="primary" loading={loadMore} onClick={() => loadMoreMovie(tabType)}>Load More</Button> </div>
    </Page>
  );
};

export default connect(null, mapDispatchToProps)(MovieList);
