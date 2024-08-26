def get_duration_matrix(client, locations):
    """
    Given a dictionary of locations, returns a matrix of walking durations between each location in minutes.
    
    :param client: The Google Maps client instance.
    :param locations: A dictionary where keys are location names and values are tuples of (latitude, longitude).
    :return: A matrix containing walking durations between each location (in minutes).
    """
    # Extracting the latitudes and longitudes from the dictionary
    origins = [location for location in locations.values()]
    n = len(origins)

    # Initialize the matrix to store durations in minutes
    duration_matrix_values = [[None] * n for _ in range(n)]

    # Function to fetch durations for a submatrix
    def fetch_submatrix(origins_subset, destinations_subset, start_row, start_col):
        distance_matrix = client.distance_matrix(origins_subset, destinations_subset, mode='walking')
        for i, row in enumerate(distance_matrix['rows']):
            for j, element in enumerate(row['elements']):
                if element['status'] == 'OK':
                    duration_matrix_values[start_row + i][start_col + j] = element['duration']['value'] / 60
                else:
                    duration_matrix_values[start_row + i][start_col + j] = None

    # Splitting the locations into chunks of up to 10
    chunk_size = 10
    for i in range(0, n, chunk_size):
        for j in range(0, n, chunk_size):
            origins_subset = origins[i:i + chunk_size]
            destinations_subset = origins[j:j + chunk_size]
            fetch_submatrix(origins_subset, destinations_subset, i, j)

    return duration_matrix_values
