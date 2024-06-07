// import referalioLogo from "../assets/icons/referalio-logo.png"; // Assuming the path is correct
import referalioLogo from '@/assets/icons/referalio-logo.png';
import Image
  from 'next/image';
export function Logomark() {
  return (
    <div className="mb-2">
      <Image src={referalioLogo} alt="Referalio Logo" className='w-32' />
    </div>
  )
}

export function Logo() {
  return (
    <div className="flex items-center text-gray-900">
      <div className="mb-2">
        <Image src={referalioLogo} alt="Referalio Logo" className='w-32' />
      </div>
    </div>
  )
}
