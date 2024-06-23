import Image from "next/image";

export interface TaskContainerProps {
  task: string;
  imagePath?: string;
  alt?: string;
}

export default function TaskContainer({
  task,
  imagePath,
  alt,
}: TaskContainerProps) {
  return (
    <div>
      <h2>{task}</h2>
      {imagePath ? (
        <>
          <Image
            src={imagePath}
            alt={alt ? alt : ""}
            height={75}
            width={75}
          ></Image>
        </>
      ) : null}
    </div>
  );
}
