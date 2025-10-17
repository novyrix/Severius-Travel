import Script from 'next/script'

export default function UnsplashScript() {
  return (
    <Script
      id="unsplash-utm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Unsplash UTM parameters for proper attribution
          window.unsplashUTM = '?utm_source=severius_travel&utm_medium=referral';
        `,
      }}
    />
  )
}
