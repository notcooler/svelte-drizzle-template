import sys
import traceback
import s3
import time
from log import Logger

LOGGER = Logger("main")

SETUPS = {
    "s3": s3.main,
}

def main():
    """
    Main function to run the setup scripts.
    """

    LOGGER.info("Starting setup...")
    for service, setup in SETUPS.items():
        LOGGER.info(f"Running setup for {service}...")
        try:
            setup()
        except Exception as e:
            LOGGER.error(f"Error during setup for {service}: {e}")
            traceback.print_exc(file=sys.stderr)
    LOGGER.success("Setup completed.")

if __name__ == "__main__":
    main()