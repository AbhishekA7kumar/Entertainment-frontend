import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";

import { getConfigurationSizesApi, getTvSeriesApi, getTvSeriesCastApi } from "./api";
import { useAuth } from "../../store/auth";
import Caste from "../../components/common-media/Caste";
import ReviewStars from "../../components/common-media/ReviewStars";
import TitleValue from "../../components/common-media/TitleValue";
import Genre from "../../components/common-media/Genre";
import LoaderSpinner from "../LoaderSpinner";

function TV() {
  const { id } = useParams();
  const { state } = useAuth();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tvSeriesResponse, setTvSeriesResponse] = useState({});
  const [castResponse, setCastResponse] = useState({});
  const [configurationResponse, setConfigurationResponse] = useState({});

  useEffect(() => {
    setLoading(true);

    Promise.all([
      getTvSeriesApi(id),
      getTvSeriesCastApi(id, state.tmdbToken),
    ])
      .then(([tvSeriesResponse, castResults]) => {
        setTvSeriesResponse(tvSeriesResponse.result);
        setRating(tvSeriesResponse.result.vote_average);
        setCastResponse(castResults.result);

        return getConfigurationSizesApi(state.tmdbToken);
      })
      .then((response) => setConfigurationResponse(response.result))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id, state.tmdbToken]);

  return loading ? (
    <LoaderSpinner />
  ) : (
    <div className="flex gap-x-10 bg-black px-12 lg:px-24 xl:px-48 lg:py-6 2xl:py-12 min-h-screen">
      {/* Poster Section */}
      <div className="w-1/3">
        <img
          alt="poster"
          className="rounded"
          src={`${configurationResponse?.images?.base_url}/${configurationResponse?.images?.poster_sizes?.[6]}/${tvSeriesResponse?.poster_path}`}
        />
      </div>

      {/* Details Section */}
      <div className="space-y-10 w-2/3">
        {/* Title and Rating */}
        <div className="space-y-2">
          <h1 className="text-4xl text-white">{tvSeriesResponse?.name}</h1>
          <h1 className="text-lg text-zinc-500">{tvSeriesResponse?.tagline}</h1>
        </div>
        <h2 className="text-2xl text-white">
          <ReviewStars rating={rating} />
        </h2>

        {/* Key Details */}
        <div className="flex justify-between">
          <TitleValue title="Language" value={tvSeriesResponse?.original_language} />
          <TitleValue title="First Air" value={tvSeriesResponse?.first_air_date} />
          <TitleValue title="Last Air" value={tvSeriesResponse?.last_air_date} />
          <TitleValue title="Status" value={tvSeriesResponse?.status} />
        </div>

        {/* Genres */}
        <div className="space-y-3 w-full">
          <h3 className="text-white text-xl">Genres</h3>
          <div className="flex flex-wrap gap-x-2">
            {tvSeriesResponse?.genres?.map((genre) => (
              <Genre key={genre.id}>{genre.name}</Genre>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-3">
          <h3 className="text-white text-xl">Overview</h3>
          <div className="text-white leading-tight tracking-tight">
            {tvSeriesResponse?.overview}
          </div>
        </div>

        {/* Casts */}
        <div className="space-y-3">
          <h3 className="text-white text-xl">Casts</h3>
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {castResponse?.cast?.map((cast) => (
              <Caste key={cast.id}>{cast.name}</Caste>
            ))}
          </div>
        </div>

        {/* Website Button */}
        <div>
          <button
            onClick={() => window.open(tvSeriesResponse?.homepage, "_blank")}
            className="flex items-center bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded text-white"
          >
            Website <LinkIcon className="ml-2 -rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TV;
