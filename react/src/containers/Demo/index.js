/**
 * @author Jay
 * @date 2020-01-01
 * @description
 */
import React, { Suspense, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "Components/Loading";

import Tabel from "./Tabel";
import TabelPage from "./TabelPage";
import Calendar from "./Calendar";
import Upload from "./Upload";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    const {
      match: { path }
    } = this.props;
    return (
      <div className="home" data-spm="spm-a-home">
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={`${path}/tabel`} component={Tabel} />
            <Route path={`${path}/tabelPage`} component={TabelPage} />
            <Route path={`${path}/calendar`} component={Calendar} />
            <Route path={`${path}/upload`} component={Upload} />
            <Redirect to={`${path}/tabel`} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default Home;
