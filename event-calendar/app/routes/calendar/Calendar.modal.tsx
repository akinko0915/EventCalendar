import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Image,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import type { CalendarEvent } from "./Calendar.display";

type CalendarModalProps = {
  event: CalendarEvent | null;
  onClose: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({ event, onClose }) => {
  const { isOpen, onOpen, onClose: chakraClose } = useDisclosure();

  useEffect(() => {
    if (event) {
      onOpen();
    } else {
      chakraClose();
    }
  }, [event, onOpen, chakraClose]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}/${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}`;
  }

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  function isEventInFuture(eventEndAt: string) {
    const now = new Date();
    const eventEndDate = new Date(eventEndAt);
    return eventEndDate > now;
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          chakraClose();
          onClose();
        }}
        size="lg"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={30} fontWeight={700}>
            {event?.title.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid gap={4}>
              <GridItem>
                <Center>
                  <Image
                    src={`/images/${event?.imageUrl}.png`}
                    alt="eventImage"
                    objectFit="cover"
                    objectPosition="center top"
                    width="450px"
                    height="250px"
                  />
                </Center>
              </GridItem>
              <GridItem>
                <p>Date: {event && formatDate(event.startAt)}</p>
                <p>
                  Time: {event && formatTime(event.startAt)}
                  {event &&
                    event.startAt !== event.endAt &&
                    ` ~ ${formatTime(event.endAt)}`}
                </p>
                <p>Place: {event?.place}</p>
                <p>Fee: {event?.fee}円 （カフェで開催の場合は +1ドリンク）</p>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            {event && isEventInFuture(event.endAt) && (
              <Button textColor="white" bg="brand.200" mr={3}>
                Detail
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalendarModal;
