import Rating from 'react-star-rating-component';
import AddReview from './addReview';
import { useState } from 'react';

export default function Reviews(props) {

    const [show, setShow] = useState(false);

    return (
        <div className='pt-4'>
            <p className='pb-1 border-b border-gray-200'>Reviews</p>
            <div className='pt-2 flex flex-col'>
                {props.data.length == 0 ? <><div className='flex justify-center text-sm font-bold'>No reviews yet.</div></> :
                    <>
                        <div>
                            <div className='font-small text-sm text-gray-900'>Easy to Join</div>
                            <div className='flex'>
                                <Rating
                                    name='easy_to_join'
                                    value={props.data[0].length == 0 ? 0 : parseInt(props.data[0].EasyToJoin)}
                                    starCount={5}
                                    starColor={'#ffb400'}
                                    emptyStarColor={'#ccc'}
                                />
                                <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>{props.data[0].EasyToJoin} out of 5</p>
                            </div>
                        </div>
                        <div>
                            <div className='font-small text-sm text-gray-900'>Relationship with affiliates</div>
                            <div className='flex'>
                                <Rating
                                    name={'rating_relation'}
                                    value={parseInt(props.data[0].Relationship)}
                                    starCount={5}
                                    starColor={'#ffb400'}
                                    emptyStarColor={'#ccc'}
                                />
                                <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>{props.data[0].EasyToJoin} out of 5</p>
                            </div>
                        </div>
                        <div>
                            <div className='font-small text-sm text-gray-900'>Payment deadline</div>
                            <div className='flex'>
                                <Rating
                                    name={'rating_payment'}
                                    value={parseInt(props.data[0].PaymentDeadline)}
                                    starCount={5}
                                    starColor={'#ffb400'}
                                    emptyStarColor={'#ccc'}
                                />
                                <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>{props.data[0].PaymentDeadline} out of 5</p>
                            </div>
                        </div>
                    </>
                }
            </div>
            <AddReview show={show} setShow={setShow} />
        </div>
    )
}