interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}
const PageContainer = (props: PageContainerProps) => {
  return (
    <div className={`flex w-full justify-center py-5 px-10 ${props.className}`}>
      {props.children}
    </div>
  );
};

export default PageContainer;
