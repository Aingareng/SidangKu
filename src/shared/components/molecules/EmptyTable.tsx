interface IProps {
  title?: string;
  text?: string;
}

export default function EmptyTableData({ text, title }: IProps) {
  const defaultTitle = "Data Kosong";
  const defaultText = "Silahkan tambahkan data terlebih dahulu";

  return (
    <div className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
      <div className="flex flex-col items-center justify-center gap-5">
        <h3 className="text-3xl font-semibold">
          {title ? title : defaultTitle}
        </h3>
        <p>{text ? text : defaultText}</p>
      </div>
    </div>
  );
}
