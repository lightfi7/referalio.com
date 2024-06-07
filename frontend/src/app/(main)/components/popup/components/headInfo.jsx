import Rating from 'react-star-rating-component'
import { countRate } from '@/utils/utils';

export default function HeadInfo(props) {

    return (
        <div className="border-b border-gray-200 pb-5">
            <div className='mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none'>
                <div className='flex items-center gap-x-1'>
                    <div>
                        <div className='flex gap-x-1'>
                            <h3 className="mt-1 text-base font-semibold leading-6 text-gray-900 flex items-center">{props.data ? props.data.name : ""}</h3>
                        </div>
                        <div className='flex items-center mt-1'>
                            <Rating key={props.id}
                                name={'rating' + props.id}
                                value={countRate(props && props.data && props.data.average_ratings)}
                                starCount={5}
                                starColor={'#ffb400'}
                                emptyStarColor={'#ccc'} />
                            <p className='ml-2 text-sm font-medium text-gray-500 dark:text-gray-400'>{isNaN(countRate(props && props.data && props.data.average_ratings)) ? "0.00" : countRate(props && props.data && props.data.average_ratings)} out of 5.00</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-x-4 sm:gap-x-6'>
                    <div>
                        <div className='flex space-x-2 items-center'>
                            <a href={props.data.length == 0 ? '' : props.data.link_data.Website} target="_blank" className='hidden text-sm font-semibold leading-6 text-gray-900 sm:block'>Visit Website</a>
                            <a href={props.data.length == 0 ? '' : props.data.link_data.Infos} target="_blank" className='hidden text-sm font-semibold leading-6 text-gray-900 sm:block'>More Infos</a>
                            <a href={props.data.length == 0 ? '' : props.data.link_data.Apply} target="_blank" className='rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'>Apply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}