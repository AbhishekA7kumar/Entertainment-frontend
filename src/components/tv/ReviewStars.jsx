import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


function ReviewStars({ rating }) {

  const fullStarsCount = Math.floor(rating);
  const halfStar = (rating % 1) >= 0.5;
  const remaining = 5 - fullStarsCount - (halfStar ? 1 : 0);

  const filledStars = new Array(fullStarsCount).fill(null);
  const emptyStars = new Array(remaining).fill(null);
  return (

    <div className='flex items-center space-x-5'>
      <span className='text-3xl'>{rating?.toFixed(1)}</span>
      <div className='flex space-x-2'>
        {
          filledStars.map((_, index) => {
            return (<StarIcon key={index}></StarIcon>)
          })
        }
        {halfStar && (<StarHalfIcon></StarHalfIcon>)}
        {
          emptyStars.map((_, index) => {
            return (<StarOutlineIcon key={index}></StarOutlineIcon>)
          })
        }
      </div>

    </div>

  )

}

export default ReviewStars;