import Image from 'next/image';

export default function Error() {
  return (
    <>
      <div className="min-h-screen px-4 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 text-left lg:text-center">
          <h2 className="text-5xl max-w-xl mx-auto mt-8 text-left lg:text-center animate-pulse">
            404 You&apos;ve taken a wrong turn
          </h2>
          <p className="text-2xl max-w-xl mx-auto mt-4 text-left lg:text-center">
            Looks like you got lost in the party.
          </p>
          <p className="max-w-xl mx-auto mt-8 text-left lg:text-center">
            Either you did something wrong or I may have forgot to implement something
          </p>
          <p>
            Probably I forgot
          </p>
        </div>
      </div>
    </>
  );
}
