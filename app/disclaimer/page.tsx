export default function Disclaimer() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center  px-4 py-8">
        <div className="w-full max-w-3xl  shadow-md rounded-2xl p-6 text-white space-y-4">
          <h1 className="text-3xl font-bold ">Disclaimer</h1>

          <p>
            This website has been developed for educational and personal
            learning purposes only. We do not host or store any video files on
            our servers. All media content is sourced from publicly available
            third-party websites.
          </p>

          <p>
            We do not claim ownership of any anime content displayed or linked
            on this site. All trademarks, copyrights, and associated media
            belong to their respective owners.
          </p>

          <p>
            We are committed to respecting intellectual property rights. If you
            are a content owner or an authorized representative and believe that
            material available through this site infringes upon your rights,
            please contact us with the appropriate details. We will review and
            address such concerns accordingly.
          </p>

          <p>
            By using this website, you acknowledge that all content access is at
            your own discretion and risk. The creators of this site are not
            liable for how the information is used or for any consequences that
            may arise from its usage.
          </p>
        </div>
      </main>
    </div>
  );
}
