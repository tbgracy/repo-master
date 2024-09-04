export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-center">
      <hr />
      <p className="p-2 text-sm">
        &copy; {currentYear} - Made with 👐 by{" "}
        <a
          href="https://github.com/tbgracy"
          target="_blank"
          className="text-teal-600"
        >
          @tbgracy
        </a>
      </p>
    </footer>
  );
};
