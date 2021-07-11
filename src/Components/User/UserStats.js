import React from "react";
import { STATS_GET } from "../../api";
import Loading from '../Helper/Loading'
import Error from '../Helper/Error'
import useFetch from "../../Hooks/useFetch";
import Head from "../Helper/Head";
import UserStatsGraphs from "./UserStatsGraphs";

const UserStats = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);

  if(loading) return <Loading />
  if(error) return <Error error={error} />
  if (data)
  return (
    <div>
      <Head title="Estatísticas" />
      <UserStatsGraphs data={data} />
    </div>
  );
  else return null;
};

export default UserStats;
