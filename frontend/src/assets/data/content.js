export const heros = {
  title: '16K+ Referalio Programs 673 Niches',
  description:
    'Referalio offers you the best solution to find the affiliate programs that match your niches in a minute.',
  free: 'Get all programs',
  try: 'Try it for free',
}

export const reviews = [
  {
    title: 'It really works.',
    body: 'I downloaded referalio today and turned $5000 into $25,000 in half an hour.',
    author: 'CrazyInvestor',
    rating: 5,
  },
  {
    title: 'You need this.',
    body: 'Affilisting allows all website publishers to optimize their revenue by finding high quality, high paying affiliate programs very quickly.',
    author: 'CluelessButRich',
    rating: 5,
  },
  {
    title: 'This shouldn’t be legal.',
    body: 'Referalio makes it so easy to win big in the stock market that I can’t believe it’s actually legal.',
    author: 'LivingDaDream',
    rating: 5,
  },
  {
    title: 'Screw financial advisors.',
    body: 'I barely made any money investing in mutual funds. With Referalio, I’m doubling my net-worth every single month.',
    author: 'JordanBelfort1962',
    rating: 5,
  },
  {
    title: 'I love it!',
    body: 'I started providing insider information myself and now I get new insider tips every 5 minutes. I don’t even have time to act on all of them. New Lamborghini is being delivered next week!',
    author: 'MrBurns',
    rating: 5,
  },
  {
    title: 'Too good to be true.',
    body: 'I was making money so fast with Referalio that it felt like a scam. But I sold my shares and withdrew the money and it’s really there, right in my bank account. This app is crazy!',
    author: 'LazyRich99',
    rating: 5,
  },
  {
    title: 'Wish I could give 6 stars',
    body: 'This is literally the most important app you will ever download in your life. Get on this before it’s so popular that everyone else is getting these tips too.',
    author: 'SarahLuvzCash',
    rating: 5,
  },
  {
    title: 'Bought an island.',
    body: 'Yeah, you read that right. Want your own island too? Get Referalio.',
    author: 'ScroogeMcduck',
    rating: 5,
  },
  {
    title: 'No more debt!',
    body: 'Affilisting has saved me several hours (and therefore $$$) each week. I spend less time on my Sheets for management and on SEO tools looking for keywords to find the right affiliate, I only have to switch to Affilisting and filter to find the right affiliate related to my sites.',
    author: 'BruceWayne',
    rating: 5,
  },
  {
    title: 'I’m 13 and I’m rich.',
    body: 'Affilisting is a great online tool that allows you to find and list affiliate programs. It is easy to use and provides a lot of valuable information. I would definitely recommend it to anyone looking for a way to find and list affiliate programs.',
    author: 'RichieRich',
    rating: 5,
  },
  {
    title: 'Started an investment firm.',
    body: 'I charge clients a 3% management fee and just throw all their investments into Referalio. Easy money!',
    author: 'TheCountOfMonteChristo',
    rating: 5,
  },
  {
    title: 'It’s like a superpower.',
    body: 'Every tip Referalio has sent me has paid off. It’s like playing Blackjack but knowing exactly what card is coming next!',
    author: 'ClarkKent',
    rating: 5,
  },
  {
    title: 'Quit my job.',
    body: 'I downloaded Referalio three days ago and quit my job today. I can’t believe no one else thought to build a stock trading app that works this way!',
    author: 'GeorgeCostanza',
    rating: 5,
  },
  {
    title: 'Don’t download this app',
    body: 'Unless you want to have the best life ever! I am literally writing this from a yacht.',
    author: 'JeffBezos',
    rating: 5,
  },
]

export const plans = [
  {
    name: 'Starter',
    featured: false,
    price: { Monthly: '$0', Annually: '$0' },
    description:
      'You’re new to investing but want to do it right. Get started for free.',
    button: {
      label: 'Get started for free',
      href: '/list',
    },
    features: [
      'Commission-free 50 affiliate programs',
      'Multi-layered encryption',
      'One tip every day',
      'Invest up to $1,500 each month',
    ],
    logomarkClassName: 'fill-gray-300',
  },
  {
    name: 'Investor',
    featured: false,
    price: { Monthly: '$7', Annually: '$70' },
    description:
      'You’ve been investing for a while. Invest more and grow your wealth faster.',
    button: {
      label: 'Subscribe',
      href: '/payment',
    },
    features: [
      '16015 affiliate programs',
      '673 niches',
      'Lifetime access',
      'Futures updates and affiliate programs',
    ],
    logomarkClassName: 'fill-gray-500',
  },
]

export const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

export const variantStyles = {
  solid: {
    cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
  },
}

export const faqs = [
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    answer: 'Lorem ipsum dolor sit amet consectetur adipisicing...',
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur...',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  {
    question: 'Lorem ipsum dolor sit amet consectetur adipisicing...',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.',
  },
  // More questions...
]

export const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'COMMISSION (%)', uid: 'commissionPercent' },
  { name: 'COMMISSION', uid: 'commission' },
  { name: 'COOKIE DURATION', uid: 'cookie' },
]

export const navigation = [
  { name: 'Promoted 🔥', current: false },
  { name: 'All', current: false },
]

export const features = [
  {
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing...',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing...',
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing....',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing.....',
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing... ...',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing...',
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing... ... ...',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing... ... .... ... ...',
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing... ...',
  },
  {
    name: 'Lorem ipsum dolor sit amet consectetur adipisicing... ... ... ...',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing... ... ...',
  },
]
