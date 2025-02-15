const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Entertainment',
      path: '/entertainment',
      icon: 'tabler:mail'
    },
    {
      title: 'Political News',
      path: '/political-news',
      icon: 'tabler:mail'
    },
    {
      title: 'Sports',
      path: '/sports',
      icon: 'tabler:mail'
    },
    {
      title: 'Telangana',
      path: '/telangana',
      icon: 'tabler:mail'
    },
    {
      title: 'Andhra Pradesh',
      path: '/andhra-pradesh',
      icon: 'tabler:mail'
    },
    {
      title: 'National News',
      path: '/national-news',
      icon: 'tabler:mail'
    },
    {
      title: 'International News',
      path: '/international-news',
      icon: 'tabler:mail'
    },
    {
      title: 'Business News',
      path: '/business-news',
      icon: 'tabler:mail'
    },
    {
      title: 'Photos',
      path: '/photos',
      icon: 'tabler:mail'
    },
    {
      title: 'Videos',
      path: '/videos',
      icon: 'tabler:mail'
    },
    {
      title: 'General News',
      path: '/general-news',
      icon: 'tabler:mail'
    },
    {
      path: '/admin/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
